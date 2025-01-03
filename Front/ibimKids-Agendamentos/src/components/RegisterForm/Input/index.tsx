import { forwardRef, HTMLProps} from "react"
import { StyledParagraph } from "../../../styles/typography"
import { Container }from "./style";

interface InputProps extends HTMLProps<HTMLInputElement> {
    error?: { message: string } | undefined;
    type: string;
    placeholder: string;
    title: string;
  }


export const Input = forwardRef<HTMLInputElement, InputProps>(({error, title, ...rest}, ref) => {
    return(
        <Container>
            <StyledParagraph 
            fontItalic="italic"
            >{title}</StyledParagraph>
            
            <input ref={ref} {...rest}/>
            {error ? <p className="errorMessage">{error.message}</p> : null}
        </Container>

    )
})

// interface InputProps extends HTMLProps<HTMLInputElement | HTMLSelectElement> {
//   error?: { message: string } | undefined;
//   title: string;
//   as?: 'input' | 'select'; // Adicionando tipo para alternar entre input e select;
// }

// export const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
//   ({ error, title, as = 'input', ...rest }, ref) => {
//     return (
//       <Container>
//         <StyledParagraph fontItalic="italic">{title}</StyledParagraph>

//         {as === 'select' ? (
//           <select ref={ref as React.Ref<HTMLSelectElement>} {...(rest as HTMLProps<HTMLSelectElement>)}>
//             {rest.children}
//           </select>
//         ) : (
//           <input ref={ref as React.Ref<HTMLInputElement>} {...(rest as HTMLProps<HTMLInputElement>)} />
//         )}

//         {error ? <p className="errorMessage">{error.message}</p> : null}
//       </Container>
//     );
//   }
// );
