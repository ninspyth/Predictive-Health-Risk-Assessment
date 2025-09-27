import { Button } from "@/app/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";

export function Cardbots() {
  return (
    <div className="text-white">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Lung</CardTitle>
                <CardDescription>

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
