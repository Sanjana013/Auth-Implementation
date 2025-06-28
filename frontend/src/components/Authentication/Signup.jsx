import { Button, Input, VStack, Text, Box } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = ({ message, status, onClose }) => {
  if (!message) return null;

  const getBg = () => {
    switch (status) {
      case "success":
        return "#D4EDDA";
      case "error":
        return "#F8D7DA";
      case "warning":
        return "#FFF3CD";
      default:
        return "#E2E3E5";
    }
  };

  const getColor = () => {
    switch (status) {
      case "success":
        return "#155724";
      case "error":
        return "#721c24";
      case "warning":
        return "#856404";
      default:
        return "#383d41";
    }
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      bg={getBg()}
      color={getColor()}
      px={6}
      py={3}
      borderRadius="md"
      boxShadow="md"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      minWidth="300px"
    >
      <Text flex="1" mr={4}>
        {message}
      </Text>
      <Button
        size="sm"
        onClick={onClose}
        bg="transparent"
        color={getColor()}
        fontWeight="bold"
        fontSize="lg"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      >
        ×
      </Button>
    </Box>
  );
};

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", status: "" });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", status: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setNotification({
        message: "Please Select an Image!",
        status: "warning",
      });
      setLoading(false);

      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "yappspace");
      data.append("cloud_name", "dt57mf2eo");
      fetch("https://api.cloudinary.com/v1_1/dt57mf2eo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          console.log("Uploaded:", data.url.toString());
          setNotification({
            message: "Image uploaded successfully!",
            status: "success",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            message: "An error occurred during image upload.",
            status: "error",
          });
          setLoading(false);
        });
    } else {
      setNotification({
        message: "Only JPEG or PNG images are allowed.",
        status: "warning",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setNotification({
        message: "Please Fill All the Required Fields!",
        status: "warning",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setNotification({
        message: "Passwords do not Match.",
        status: "warning",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      setNotification({
        message: "User Registered successfully!",
        status: "success",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        navigate("/chats");
      }, 2000);
    } catch (error) {
      setNotification({
        message: "An error has occurred.",
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired width={"100%"}>
          <FormLabel
            fontFamily={"Open Sans"}
            fontWeight={"bold"}
            color={"#2D3748"}
          >
            Name
          </FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired width={"100%"}>
          <FormLabel
            fontFamily={"Open Sans"}
            fontWeight={"bold"}
            color={"#2D3748"}
          >
            Email
          </FormLabel>
          <Input
            placeholder="Enter Your Valid Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired width={"100%"}>
          <FormLabel
            fontFamily={"Open Sans"}
            fontWeight={"bold"}
            color={"#2D3748"}
          >
            Password
          </FormLabel>

          <Box position="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              pr="6rem"
            />

            <Button
              size="sm"
              // onClick={handleClick}
              onClick={() => setShowPassword(!showPassword)}
              position="absolute"
              top="50%"
              right="0.5rem"
              transform="translateY(-50%)"
              bg="#FFF8DC"
              color="#2D3748"
              fontWeight="bold"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{ fontSize: "1.5rem" }}
              />
            </Button>
          </Box>
        </FormControl>
        <FormControl id="password" isRequired width={"100%"}>
          <FormLabel
            fontFamily={"Open Sans"}
            fontWeight={"bold"}
            color={"#2D3748"}
          >
            Confirm Password
          </FormLabel>

          <Box position="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              pr="6rem"
            />

            <Button
              size="sm"
              // onClick={handleClick}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              position="absolute"
              top="50%"
              right="0.5rem"
              transform="translateY(-50%)"
              bg="#FFF8DC"
              color="#2D3748"
              fontWeight="bold"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                style={{ fontSize: "1.5rem" }}
              />
            </Button>
          </Box>
        </FormControl>
        <FormControl id="pic" width={"100%"}>
          <FormLabel
            fontFamily={"Open Sans"}
            fontWeight={"bold"}
            color={"#2D3748"}
          >
            Upload Your Picture
          </FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          bg="#2D3748"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          fontSize="md"
          fontWeight="bold"
          fontFamily={"Open Sans"}
          color={"#FFF8DC"}
          height={"2rem"}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
      <Notification
        message={notification.message}
        status={notification.status}
        onClose={() => setNotification({ message: "", status: "" })}
      />
    </>
  );
};

export default Signup;
