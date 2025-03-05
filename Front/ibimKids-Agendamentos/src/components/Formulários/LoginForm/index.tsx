import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "../../../providers/UserContext";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { Button, Input, Form, InputGroup } from "rsuite";
import { LoginFormValues, TLoginSchema, loginSchema } from "./interface";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { userLogin } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = () => {
    setVisible(!visible);
  };

  // Captura o valor do e-mail
  const watchedEmail = watch("email");

  useEffect(() => {
    if (watchedEmail) {
      setEmail(watchedEmail);
    }
  }, [watchedEmail]);

  useEffect(() => {
    // Se o navegador preencher automaticamente o e-mail, atualiza o estado do formulário
    const savedEmail = document.querySelector("input[title='email']")?.value;
    if (savedEmail) {
      setValue("email", savedEmail);
      setEmail(savedEmail);
    }
  }, [setValue]);



  const submit = async (data: TLoginSchema) => {
    userLogin(data);
  };

  return (
    <>
      <Form
        onSubmit={(_, event) => {
          event?.preventDefault();
          handleSubmit(submit)();
        }}
        noValidate
      >
        <StyledTitle fontWeight="bold">Login</StyledTitle>
 
        <Input
          title="email"
          type="email"
          placeholder="Digite aqui seu email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setValue("email", value);
          }}
          errorMessage={errors.email?.message}
        />

        <InputGroup inside>
          <Input
            title="senha"
            type={visible ? "text" : "password"}
            value={senha}
            onChange={(value) => {
              setSenha(value);
              setValue("senha", value);
            }}
            placeholder="Digite aqui sua senha"
          />
          <InputGroup.Button onClick={handleChange}>
            {visible ? <VisibleIcon /> : <EyeCloseIcon />}
          </InputGroup.Button>
        </InputGroup>

        <Button appearance="primary" type="submit">
          Entrar
        </Button>

        <StyledParagraph>Ainda não possui uma conta?</StyledParagraph>
        <a href="/register">Cadastre-se</a>
      </Form>
    </>
  );
};
