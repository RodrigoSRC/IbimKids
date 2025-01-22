import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../pages/LoginPage/validator";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface UserProviderProps {
    children: ReactNode
}

interface UserContextValues {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userLogin: (data: LoginData) => void;
  userLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  loading: boolean;
  isOpenEditUser: boolean;
  setIsOpenEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveUser: boolean;
  setIsOpenRemoveUser: React.Dispatch<React.SetStateAction<boolean>>;
  userRegister: (formData: any) => void;
  deleteUser: (userId: string) => void;
  editUser: (formData: any, userId: string) => void;
}


interface RegisterFormData {
  nome: string;
  email: string;
}

interface EditFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}


export const UserContext = createContext<UserContextValues>({} as UserContextValues)

export const UserProvider = ({ children }: UserProviderProps) => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isOpenEditUser, setIsOpenEditUser] = useState(false);
    const [isOpenRemoveUser, setIsOpenRemoveUser] = useState(false);

    const currentPath = window.location.pathname

    useEffect(() => {
        const token = localStorage.getItem("@TOKEN")

        if (token) {
          api.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])


    const userLogin = async (data: LoginData) => {
        try {
            console.log(data)
            const response = await api.post("/login", 
            data)

            toast.success("Login realizado com sucesso", {
              theme: "dark",
              autoClose: 1500,
            });

            setTimeout(() => {setUser(response.data.user);} , 1500);
            const { token } = response.data

            api.defaults.headers.common.Authorization = `Bearer ${token}`
            localStorage.setItem("@TOKEN", token)
            localStorage.setItem("@USERID", response.data.user.id)
            
        } catch (error) {
          toast.error("Email ou senha inválidos", {
            theme: "dark",
            autoClose: 1500,
          });
        }

    }
    
    const userLogout = (e: any) => {
      e.preventDefault()
      toast.success("Usuário deslogado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      setTimeout(() => {setUser(null), localStorage.removeItem("@TOKEN"),
      localStorage.removeItem("@USERID"), localStorage.removeItem("@USERNAME")}, 1500);
  }


    const userRegister = async (formData: RegisterFormData) => {
        try {
            
            await api.post('/clients', formData);
            console.log(formData)

            toast.success("Usuário cadastrado com sucesso", {
              theme: "dark",
              autoClose: 1500,
            });

            setTimeout(() => {navigate("/")} , 1500);
        } catch(error) {
          toast.error("Usuário já cadastrado", {
            theme: "dark",
            autoClose: 1500,
          });
        }
    }


    const deleteUser = async (userId: string) => {
        try {
          const token = localStorage.getItem("@TOKEN");

          toast.success("Usuário deletado com sucesso", {
            theme: "dark",
            autoClose: 1400,
          });


          setTimeout(async () => {
            setUser(null) 
            localStorage.removeItem("@TOKEN")
            localStorage.removeItem("@USERID") 
            localStorage.removeItem("@USERNAME") 
            navigate("/") 
            await api.delete(`/clients/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })} 
            , 1500);
        } catch (error) {
          console.log(error);
        }
      };


    const editUser = async (formData: EditFormData, userId: string) => {
        try {
          const token = localStorage.getItem("@TOKEN");
          
          const newUser = {
            id: userId,
            ...formData,
          };
          
          const { data } = await api.patch(`/clients/${userId}`, newUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(newUser)
    
          setUser((user: User | null) => {
            if (user && user.id === userId) {
              return { ...user, ...data };
            } else {
              return user;
            }
          });
          
          

          toast.success("Usuário editado com sucesso", {
            theme: "dark",
            autoClose: 1500,
          });

        } catch (error) {
          console.log(error)
          toast.error("Usuário já existente", {
            theme: "dark",
            autoClose: 1500,
          });
        }
      };






    useEffect(() => {
        const token = localStorage.getItem("@TOKEN")
        const UserId = localStorage.getItem("@USERID")

        const userLoad = async () => {
          try {
              setLoading(true);
              const {data} = await api.get(`/clients/${UserId}`
              , {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }
              )
              setUser(data)
              navigate(currentPath)
          } catch (error) {
              console.log(error)
              localStorage.removeItem("@TOKEN")
          }
          finally {
              setLoading(false);
          }
      }

        if (token) {
          userLoad()
          
      }
    }, [])



    return(
        <UserContext.Provider value={{ user, setUser, userRegister, userLogin, userLogout, deleteUser, editUser, loading, isOpenEditUser, setIsOpenEditUser, isOpenRemoveUser, setIsOpenRemoveUser }}>
            {children}
        </UserContext.Provider>
    )
}
