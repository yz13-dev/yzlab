export function extractLinks(html: string): string[] {
  const regex = /href="([^"]*)"/g;
  const matches = html.match(regex) || [];

  return matches
    .map((match) => {
      // Убираем href="..." и декодируем HTML-сущности (например, &amp; -> &)
      const rawUrl = match.slice(6, -1);
      const decodedUrl = rawUrl.replace(/&amp;/g, "&");
      // Удаляем query-параметры и хэши
      return decodedUrl.split("?")[0]?.split("#")[0];
    })
    .filter((path) => path !== undefined)
    .filter((path) => {
      // Основные фильтры
      return (
        path.startsWith("/") && // Только относительные пути
        !path.startsWith("//") && // Исключаем protocol-relative URLs
        !path.includes("://") && // Исключаем http://, https://
        !path.startsWith("#") && // Исключаем якоря
        !path.startsWith("mailto:") && // Исключаем email-ссылки
        !path.startsWith("tel:") && // Исключаем телефонные ссылки
        !path.startsWith("javascript:") && // Исключаем JS-код
        !path.includes("/_next/") && // Исключаем Next.js пути
        !path.includes("/static/") && // Исключаем статику
        !path.includes("/media/") && // Исключаем медиа-файлы
        !path.startsWith("/api/") && // Исключаем API endpoints
        !path.startsWith("/admin/") && // Исключаем админские панели
        !path.startsWith("/dashboard/") && // Исключаем панель управления
        !path.startsWith("/login") && // Исключаем страницу входа
        !path.startsWith("/register") && // Исключаем страницу регистрации
        !path.startsWith("/signup") && // Исключаем страницу регистрации
        !/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|json|xml|txt|webmanifest)$/i.test(
          path,
        ) // Исключаем файлы
      );
    })
    .filter((path, index, self) => self.indexOf(path) === index); // Удаляем дубликаты
}
