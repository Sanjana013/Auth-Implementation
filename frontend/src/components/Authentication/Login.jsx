import { Button, Input, VStack, Text, Box } from "@chakra-ui/react";
import { React, useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", status: "" });
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setNotification({
        message: "Please Fill All the Fields!",
        status: "warning",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      setNotification({
        message: "Login Successful!",
        status: "success",
      });
      localStorage.setItem("userInfo", JSON.stringify(data.token));
      setLoading(false);
      navigate("/chats");
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
            value={email}
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
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pr="6rem"
            />

            <Button
              size="sm"
              onClick={handleClick}
              position="absolute"
              top="50%"
              right="0.5rem"
              transform="translateY(-50%)"
              bg="#FFF8DC"
              color="#2D3748"
              fontWeight="bold"
            >
              <FontAwesomeIcon
                icon={show ? faEyeSlash : faEye}
                style={{ fontSize: "1.5rem" }}
              />
            </Button>
          </Box>
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
          Log In
        </Button>

        <Button
          bg="#4299D1"
          width="100%"
          style={{ marginTop: 15 }}
          fontSize="md"
          fontWeight="bold"
          fontFamily={"Open Sans"}
          color={"#730021"}
          height={"2rem"}
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
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

export default Login;
