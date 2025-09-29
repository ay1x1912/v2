import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_header')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_header"!</div>
}
