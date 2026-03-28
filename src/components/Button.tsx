type Props = {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'danger'
}

function Button({ label, onClick, type = 'button', disabled = false, variant = 'primary' }: Props) {
  const base = 'px-4 py-2 rounded-lg font-medium transition-opacity cursor-pointer'
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button