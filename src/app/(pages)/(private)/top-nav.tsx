"use client";

import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";
import { alpha } from "@mui/system/colorManipulator";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";

import { isServer } from "@/utils/common";

import { useWindowScroll } from "@/hooks/use-window-scroll";

import TopNavItem from "./top-nav-item";

interface Item {
  disabled?: boolean;
  external?: boolean;
  popover?: ReactNode;
  path?: string;
  title: string;
}

const items: Item[] = [
  {
    title: "Pricing",
    // path: paths.pricing,
  },
  {
    title: "Pages",
    // popover: <PagesPopover />,
  },
  {
    title: "Docs",
    // path: paths.docs,
    external: true,
  },
];

const TOP_NAV_HEIGHT = 64;

interface TopNavProps {
  onMobileNavOpen?: () => void;
}

const TopNav: FC<TopNavProps> = () => {
  const pathname = usePathname();

  const [elevate, setElevate] = useState<boolean>(false);
  const offset = 64;
  const delay = 100;

  const handleWindowScroll = useCallback((): void => {
    if (!isServer) {
      if (window?.scrollY > offset) {
        setElevate(true);
      } else {
        setElevate(false);
      }
    }
  }, []);
  useWindowScroll({
    handler: handleWindowScroll,
    delay,
  });

  const onLogin = useCallback(() => {
    window.location.href = "/login";
  }, []);
  const onSignup = useCallback(() => {
    window.location.href = "/signup";
  }, []);
  const onApp = useCallback(() => {
    window.location.href = "/dashboard";
  }, []);

  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        // pt: 2,
        p: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Box
        sx={{
          backdropFilter: "blur(50px)",
          backgroundColor: "transparent",
          borderRadius: 2.5,
          boxShadow: "none",
          transition: (theme) =>
            theme.transitions.create("box-shadow, background-color", {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: TOP_NAV_HEIGHT, width: "100%" }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              display="inline-flex"
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                className="hidden md:block"
                sx={{ flexGrow: 1, textAlign: "right" }}
              >
                <Box
                  sx={{
                    color: "text.primary",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: "0.3px",
                    paddingRight: "2px", // Adjust padding right for spacing
                    lineHeight: 2.5,
                    "& span": {
                      color: "primary.main",
                    },
                  }}
                >
                  ViniMart For Shopping
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Box className="hidden md:block" style={{ marginRight: "20px" }}>
            <Stack direction="row" spacing={2}>
              <Box component="nav" sx={{ height: "100%" }}>
                <Stack
                  component="ul"
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                  spacing={1}
                  sx={{
                    height: "100%",
                    width: "100%",
                    listStyle: "none",
                    m: 1.6,
                    p: 0,
                  }}
                >
                  <>
                    {items.map((item) => {
                      const checkPath = !!(item.path && pathname);
                      const partialMatch = checkPath
                        ? pathname.includes(item.path!)
                        : false;
                      const exactMatch = checkPath
                        ? pathname === item.path
                        : false;
                      const active = item.popover ? partialMatch : exactMatch;

                      return (
                        <TopNavItem
                          active={active}
                          external={item.external}
                          key={item.title}
                          path={item.path}
                          popover={item.popover}
                          title={item.title}
                        />
                      );
                    })}
                  </>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default TopNav;

// import { Box, Container, Stack } from "@mui/material";

// const TOP_NAV_HEIGHT = 64;

// function TopNav() {
//   return (
//     <Box
//       component="header"
//       sx={{
//         left: 0,
//         right: 0,
//         top: 0,
//         position: "fixed",
//         backgroundColor: "pink",
//         zIndex: (theme) => theme.zIndex.appBar,
//       }}
//     >
//       <Box sx={{ borderRadius: 2.5 }}>
//         <Stack direction="row" sx={{ height: "100%" }}>
//           Working
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

// export default TopNav;
