import { redis } from "@/extensions/redis"

/**
 * Универсальная функция для удаления ключей по паттерну
 * @param {string} pattern - Паттерн для поиска ключей (например: 'ogs:*', 'user:*', 'cache:*')
 * @param {Object} options - Дополнительные опции
 * @param {number} options.count - Количество ключей за одну итерацию (по умолчанию 100)
 * @param {boolean} options.dryRun - Режим проверки без удаления (по умолчанию false)
 * @param {Function} options.onProgress - Колбэк для отслеживания прогресса
 * @returns {Promise<{deletedCount: number, foundKeys?: string[]}>}
 */
async function deleteKeysByPattern(pattern: string, options?: { count?: number }) {
  const {
    count = 100,
  } = options || {}

  let cursor = '0'
  let deletedCount = 0

  do {
    try {
      // Сканируем ключи с заданным паттерном
      const result = await redis.scan(cursor, {
        match: pattern,
        count
      })

      cursor = result[0]
      const keys = result[1]

      if (keys.length > 0) {
        // Удаляем найденные ключи
        const actualDeleted = await redis.del(...keys)
        deletedCount += actualDeleted
      }
    } catch (error) {
      console.error(`Ошибка при обработке ключей с паттерном ${pattern}:`, error)
      throw error
    }
  } while (cursor !== '0')

  const action = 'удалено'
  console.log(`${action} ${deletedCount} ключей по паттерну: ${pattern}`)

  return deletedCount
}

/**
 * Удаляет ключи по нескольким паттернам
 * @param {string[]} patterns - Массив паттернов
 * @param {Object} options - Дополнительные опции
 */
export async function deleteKeysByPatterns(patterns: string[], options?: { count?: number }) {
  let totalDeleted = 0
  const results: { pattern: string, count: number }[] = []

  for (const pattern of patterns) {
    const result = await deleteKeysByPattern(pattern, options)
    totalDeleted += result
    results.push({
      pattern,
      count: result
    })
  }

  console.log(`Всего удалено ${totalDeleted} ключей по ${patterns.length} паттернам`)

  return {
    totalDeleted,
    results
  }
}
