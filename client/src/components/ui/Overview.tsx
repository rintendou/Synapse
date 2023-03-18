import React from "react"

type Props = {
  children: React.ReactNode
}

const Overview = ({ children }: Props) => {
  return <div className="text-center">{children}</div>
}

export default Overview
