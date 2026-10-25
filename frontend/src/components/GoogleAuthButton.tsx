import { GoogleLogin, type GoogleLoginProps } from "@react-oauth/google";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/User.context";
import { googleLogin } from "@/services/auth.service";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

type GoogleAuthButtonProps = {
  text: GoogleLoginProps["text"];
};

function GoogleAuthButton({ text }: GoogleAuthButtonProps) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  // O botão do Google é um iframe com largura fixa em px (máx. 400)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.min(Math.floor(entry.contentRect.width), 400));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleError = (error?: unknown) => {
    const message = (error as { response?: { data?: { message?: string } } })
      ?.response?.data?.message;
    toast.error(message || "Não foi possível entrar com o Google");
  };

  const handleSuccess: GoogleLoginProps["onSuccess"] = async ({
    credential,
  }) => {
    if (!credential) {
      handleError();
      return;
    }

    try {
      const user = await googleLogin(credential);
      setUser(user);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  if (!GOOGLE_CLIENT_ID) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => toast.info("Login com Google ainda não configurado.")}
        className="h-[52px] w-full lg:short:h-11 lg:shorter:h-10 gap-2.5 rounded-[14px] border-[#D6D6D1] bg-white text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#FAFAF8]"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {text === "signup_with" ? "Cadastrar com Google" : "Entrar com Google"}
      </Button>
    );
  }

  return (
    <div ref={containerRef} className="flex h-11 w-full justify-center">
      {width && (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => handleError()}
          text={text}
          theme="outline"
          size="large"
          shape="pill"
          width={width}
        />
      )}
    </div>
  );
}

export default GoogleAuthButton;
