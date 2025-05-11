import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Input
        className="bg-background w-full pr-10"
        placeholder="ค้นหาสินค้า"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
