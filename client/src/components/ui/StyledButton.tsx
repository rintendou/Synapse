type Props = {
  onClick: () => void
  buttonText: string
  intent: "primary" | "secondary"
}

const StyledButton = ({ onClick, buttonText, intent = "primary" }: Props) => {
  const isPrimaryClasses =
    intent === "primary"
      ? "bg-secondary text-primary"
      : "bg-primary text-secondary border border-primary"

  return (
    <button onClick={onClick} className={`px-4 py-2 ${isPrimaryClasses}`}>
      {buttonText}
    </button>
  )
}

export default StyledButton
