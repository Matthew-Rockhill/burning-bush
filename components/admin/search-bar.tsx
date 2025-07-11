import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "" 
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-bb-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
} 