export type Props = React.ComponentProps<"canvas"> & {
  width?: number;
  height?: number;
};
export default function ({
  height = 600,
  width = 900,
  className,
  ref,
  ...props
}: Props) {
  return (
    <canvas
      ref={ref}
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
}
