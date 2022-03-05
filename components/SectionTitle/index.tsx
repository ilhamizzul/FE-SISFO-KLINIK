import { ReactNode } from "react"

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="my-1 text-4xl font-bold">{children}</h1>
}

export default SectionTitle
