import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "xn-----6kco4daffv.xn--p1ai",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "stevent.ru",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
