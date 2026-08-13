interface WhatsAppButtonProps {
  href: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}

export function WhatsAppButton({
  href,
  label = "Order on WhatsApp",
  variant = "solid",
  className = "",
}: WhatsAppButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors";
  const styles =
    variant === "solid"
      ? "bg-navy text-white hover:bg-navy-shade"
      : "border border-navy text-navy hover:bg-navy hover:text-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.868-2.885-1.532-4.031-3.473-.302-.518.302-.482.865-1.604.098-.198.049-.371-.05-.52-.099-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.059 3.146 4.995 4.29 2.937 1.145 2.937.763 3.883.663.947-.099 3.084-1.264 3.517-2.487.433-1.223.433-2.27.303-2.487-.13-.198-.297-.297-.594-.446zM12.017 2.003c-5.51 0-9.985 4.474-9.985 9.984 0 1.763.462 3.42 1.269 4.858L2 22l5.303-1.267a9.937 9.937 0 0 0 4.714 1.197h.004c5.511 0 9.985-4.474 9.985-9.984 0-2.669-1.038-5.176-2.924-7.062A9.923 9.923 0 0 0 12.017 2.003zm5.868 15.85a8.29 8.29 0 0 1-5.868 2.43h-.003a8.257 8.257 0 0 1-4.212-1.155l-.302-.18-3.15.753.84-3.07-.197-.316a8.253 8.253 0 0 1-1.269-4.395c0-4.583 3.732-8.315 8.318-8.315a8.26 8.26 0 0 1 5.879 2.44 8.26 8.26 0 0 1 2.436 5.878 8.29 8.29 0 0 1-2.472 5.93z" />
    </svg>
  );
}
