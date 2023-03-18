type Props = {
  onClick: () => void
  buttonText: string
  intent: "primary" | "secondary"
}

const StyledButton = ({ onClick, buttonText, intent = "primary" }: Props) => {
  const isPrimaryClasses =
    intent === "primary"
      ? "bg-secondary text-primary"
      : "bg-primary text-secondary border-2 border-secondary"

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg hover:scale-105 duration-200 ease-in-out ${isPrimaryClasses}`}
    >
      {buttonText}
    </button>
  )
}

export default StyledButton
