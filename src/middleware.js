import { withAuth } from "next-auth/middleware";

export default withAuth(
    {
        pages: {
            signIn: "/login",
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/((?!api|api/verification|api/auth|api/chat|login|$).*)"],
};
