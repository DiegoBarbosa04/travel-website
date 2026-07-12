import { Input } from "@base-ui/react";
import { Button } from "./ui/button";
import mailbox from "../assets/mailbox.svg";

function Newsletter() {
  return (
    <>
      <div className="w-308 h-76 bg-[#CDEAE1] rounded-lg flex justify-between px-6 absolute top-0">
        <div className="flex flex-col gap-4 justify-center py-6">
          <h2 className="text-4xl font-bold max-w-[13ch]">
            Se inscreva na nossa newsletter
          </h2>

          <div className="flex flex-col gap-2">
            <span className="text-[#112211] opacity-80 font-bold">
              Fique por dentro das últimas novidades e ofertas
            </span>
            <p className="text-[#112211] opacity-70">
              Receba as últimas notícias e ofertas diretamente na sua caixa de
              entrada.
            </p>
            <div className="flex gap-2 mt-1">
              <Input
                className="bg-white w-118 h-13 rounded-sm p-2"
                placeholder="Seu melhor e-mail"
              />
              <Button className="h-13 px-4 bg-[#112211] text-white hover:bg-[#112211]/80">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
        <div>
          <img src={mailbox} alt="Newsletter" className="w-100 h-76" />
        </div>
      </div>
    </>
  );
}

export default Newsletter;
