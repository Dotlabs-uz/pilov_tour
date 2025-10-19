import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        domains: ['appwrite.pilavtour.uz']
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
