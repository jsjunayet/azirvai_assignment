"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={{ xs: 4, md: 6 }}>
      <Container>
        {/* Top navigation links */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flexWrap="wrap"
        >
          <Typography
            color="#fff"
            component={Link}
            href="/"
            sx={{
              fontSize: { xs: 14, md: 16 },
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Home
          </Typography>
          <Typography
            color="#fff"
            component={Link}
            href="/projects"
            sx={{
              fontSize: { xs: 14, md: 16 },
              "&:hover": { color: "primary.main", cursor: "pointer" },
            }}
          >
            Projects
          </Typography>
          <Typography
            color="#fff"
            component={Link}
            href="/blogs"
            sx={{
              fontSize: { xs: 14, md: 16 },
              "&:hover": { color: "primary.main", cursor: "pointer" },
            }}
          >
            Blogs
          </Typography>
          <Typography
            color="#fff"
            component={Link}
            href="/contact"
            sx={{
              fontSize: { xs: 14, md: 16 },
              "&:hover": { color: "primary.main", cursor: "pointer" },
            }}
          >
            Contact
          </Typography>
          <Typography
            color="#fff"
            component={Link}
            href="/about"
            sx={{
              fontSize: { xs: 14, md: 16 },
              "&:hover": { color: "primary.main", cursor: "pointer" },
            }}
          >
            About
          </Typography>
        </Stack>

        {/* Social icons */}
        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="facebook" />
          <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          <Image src={linkedIcon} width={30} height={30} alt="facebook" />
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderBottom: "1px dashed lightgray",
            width: "100%",
            my: { xs: 2, md: 3 },
          }}
        />

        {/* Bottom Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={{ xs: 2, md: 0 }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          py={{ xs: 2, md: 3 }}
        >
          <Typography component="p" color="white" fontSize={{ xs: 13, md: 15 }}>
            &copy;2024 Portfolio Projects. All Rights Reserved.
          </Typography>

          <Typography
            variant="h5"
            component={Link}
            href="/"
            fontWeight={700}
            color="white"
            sx={{
              textDecoration: "none",
              fontSize: { xs: 20, md: 24 },
            }}
          >
            Port
            <Box component="span" color="primary.main">
              folio
            </Box>{" "}
            Project
          </Typography>

          <Typography
            component="p"
            color="white"
            fontSize={{ xs: 13, md: 15 }}
            sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
          >
            Privacy Policy • Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
