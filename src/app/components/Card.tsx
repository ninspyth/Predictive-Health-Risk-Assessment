import { Button } from "./ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

export function Cardbots() {
  return (
    <div>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                Hello
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a>
                </div>
                </div>
            </div>
            </form>
        </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="outline" className="w-full">
                    Chat with me
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
