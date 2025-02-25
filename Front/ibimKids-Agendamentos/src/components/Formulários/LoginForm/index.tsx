import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { UserContext } from "../../../providers/UserContext";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { Button, Input, Form, InputGroup } from "rsuite";
import { LoginFormValues } from "./interface";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";

export const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [senha, setSenha] = useState("");

  const handleChange = () => {
    setVisible(!visible);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  
  const submit = async (formData: LoginFormValues) => {
    userLogin(formData);
  };

  return (
    <Form
      onSubmit={(_, event) => {
        event?.preventDefault();
        handleSubmit(submit)();
      }}
    >
      <StyledTitle fontWeight="bold">Login</StyledTitle>

      {/* Input de Email */}
      <Input
        type="email"
        placeholder="Digite aqui seu email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />

      {/* Input de Senha com InputGroup */}
      <InputGroup inside>
        <Input
          type={visible ? "text" : "password"}
          value={senha}
          onChange={(value) => {
            setSenha(value);
            setValue("senha", value); // Atualiza o react-hook-form manualmente
          }}
          placeholder="Digite aqui sua senha"
        />
        <InputGroup.Button onClick={handleChange}>
          {visible ? <VisibleIcon /> : <EyeCloseIcon />}
        </InputGroup.Button>
      </InputGroup>
      {/* {errors.senha && <p style={{ color: "red" }}>{errors.senha.message}</p>} */}

      <Button appearance="primary" type="submit">Entrar</Button>

      <StyledParagraph>Ainda não possui uma conta?</StyledParagraph>
      <a href="/register">Cadastre-se</a>
    </Form>
  );
};