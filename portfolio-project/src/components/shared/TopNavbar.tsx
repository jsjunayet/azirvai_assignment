"use client";

import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";

const TopNavbar = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        width: "100%",
        backgroundColor: "primary.main",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        px: { xs: 2, md: 3, lg: 5 },
        zIndex: 1300,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Links */}
        <Stack direction="row" spacing={3}>
          <Typography
            component={Link}
            href="/dashboard/index"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#f1f1f1",
              textDecoration: "none",
              "&:hover": { color: "#d4d4d8" },
            }}
          >
            My Account
          </Typography>
          <Typography
            component={Link}
            href="/about-us"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#f1f1f1",
              textDecoration: "none",
              "&:hover": { color: "#d4d4d8" },
            }}
          >
            About Us
          </Typography>
          <Typography
            component={Link}
            href="/contact"
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#f1f1f1",
              textDecoration: "none",
              "&:hover": { color: "#d4d4d8" },
            }}
          >
            Contact
          </Typography>
        </Stack>

        {/* Right Info */}
        <Typography
          component="a"
          href="tel:+8801234567890"
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "#f1f1f1",
            textDecoration: "none",
            "&:hover": { color: "#d4d4d8" },
          }}
        >
          Call Us +880 1234-567890
        </Typography>
      </Container>
    </Box>
  );
};

export default TopNavbar;
