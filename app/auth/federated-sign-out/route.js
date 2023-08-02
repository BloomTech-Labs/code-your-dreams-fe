import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function federatedSignOut(req, res) {
    const baseUrl = process.env.AUTH0_BASE_URL;
    const authProviderUrl = process.env.AUTH0_ISSUER_BASE_URL;

    try {
        // We need to grab the session to get at the id token
        // PS: You can use the <<getToken()>> method here instead of <<getServerSession>>
        const session = await getServerSession(req, res, authOptions);
        if(!session) {
            // If the user isn't logged in, just redirect to root
            return res.redirect(baseUrl);
        }

        // Create the provider endsession url
        const endSessionURL = `${authProviderUrl}/connect/endsession`;
        // And the redirect url
        // At this url (/logout) the local next-auth session will be removed
        const redirectURL = `${baseUrl}/logout`;
        // Construct the query params and redirect the browser to the provider auth server
        const endSessionParams = new URLSearchParams({
            id_token_hint: session.user.idToken,
            // Pass the redirect url
            post_logout_redirect_uri: redirectURL
        });
        const fullUrl = `${endSessionURL}?${endSessionParams.toString()}`;
        return res.redirect(fullUrl);
    } catch (err) {
        res.redirect(baseUrl);
    }
}