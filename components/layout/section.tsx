import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  container?: boolean
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'subtle' | 'flame'
}

export default function Section({ 
  children, 
  className = '', 
  container = true,
  spacing = 'lg',
  background = 'default'
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-24',
    xl: 'py-20 lg:py-32'
  }

  const backgroundClasses = {
    default: 'bg-bb-black',
    subtle: 'bg-bb-subtle-gradient',
    flame: 'bg-bb-flame-gradient'
  }

  const content = container ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : children

  return (
    <section className={`
      ${spacingClasses[spacing]}
      ${backgroundClasses[background]}
      ${className}
    `}>
      {content}
    </section>
  )
} 