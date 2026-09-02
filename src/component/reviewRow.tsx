interface ReviewRowProps {
  label: string;
  value: string | number | undefined;
  isLast?: boolean;
}
function ReviewRow({ label, value, isLast = false }: ReviewRowProps) {
  return (
    <div>
      <span className="text-sm text-muted">{label}</span>
      <span className="text-base">{value || "—"}</span>
    </div>
  );
}

export default ReviewRow;
