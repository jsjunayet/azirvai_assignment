// "use client";
// import logo from "@/assets/svgs/logo.svg";
// import PHForm from "@/components/Forms/PHForm";
// import PHInput from "@/components/Forms/PHInput";
// import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FieldValues } from "react-hook-form";

// export type FormValues = {};

// const LoginPage = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const handleLogin = async (values: FieldValues) => {
//     console.log("login page", values);
//   };

//   return (
//     <Container>
//       <Stack
//         sx={{
//           height: "100vh",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 600,
//             width: "100%",
//             boxShadow: 1,
//             borderRadius: 1,
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           <Stack
//             sx={{
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Image src={logo} width={50} height={50} alt="logo" />
//             </Box>
//             <Box>
//               <Typography variant="h6" fontWeight={600}>
//                 Login PH HealthCare
//               </Typography>
//             </Box>
//           </Stack>
//           {/* // error */}
//           {error && (
//             <Box>
//               <Typography
//                 sx={{
//                   backgroundColor: "red",
//                   padding: "1px",
//                   borderRadius: "2px",
//                   color: "white",
//                   marginTop: "5px",
//                 }}
//               >
//                 {" "}
//                 {error}
//               </Typography>
//             </Box>
//           )}
//           <Box>
//             <PHForm
//               onSubmit={handleLogin}
//               resolver={zodResolver(loginValidationSchema)}
//               defaultValues={{
//                 email: "",
//                 password: "",
//               }}
//             >
//               <Grid container spacing={2} my={1}>
//                 <Grid item md={6}>
//                   <PHInput
//                     name="email"
//                     label="Email"
//                     type="email"
//                     fullWidth={true}
//                   />
//                 </Grid>
//                 <Grid item md={6}>
//                   <PHInput
//                     name="password"
//                     label="Password"
//                     type="password"
//                     fullWidth={true}
//                   />
//                 </Grid>
//               </Grid>

//               <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
//                 Forgot Password?
//               </Typography>

//               <Button
//                 sx={{
//                   margin: "10px 0px",
//                 }}
//                 fullWidth={true}
//                 type="submit"
//               >
//                 Login
//               </Button>
//             </PHForm>
//           </Box>
//         </Box>
//       </Stack>
//     </Container>
//   );
// };

// export default LoginPage;
