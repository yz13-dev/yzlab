import Image from "next/image";
import logo_dark from "public/logo-dark.png";
import logo_full_dark from "public/logo-full-dark.png";
import logo_full_light from "public/logo-full-light.png";
import logo_light from "public/logo-light.png";
import { cn } from "ui/cn";

const Logo = ({
  label,
  className = "",
  type = "icon",
  imgClassName,
  size = 32,
}: {
  label?: string;
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) => {
  const lightSrc = type === "icon" ? logo_light : logo_full_light;
  const darkSrc = type === "icon" ? logo_dark : logo_full_dark;
  const width = size * 2;
  const height = size;
  const isSizeToSmall = height < 40;
  const Label = () => (
    <span className="text-xs text-foreground absolute -top-2 left-[105%]">
      {label}
    </span>
  );
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <Image
          className={cn(imgClassName, "light-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt=""
        />
        <Image
          className={cn(imgClassName, "dark-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt=""
        />
        {label && <Label />}
      </div>
    );
  }
  return (
    <div className={cn("relative", className)}>
      <Image
        fill
        className={cn(imgClassName, "light-mode-image")}
        src={lightSrc}
        alt=""
      />
      <Image
        fill
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt=""
      />
      {label && <Label />}
    </div>
  );
};
export { Logo };
