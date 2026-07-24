import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";

interface AccountTabProps {
  name: string;
  lastName: string;
  email: string;
}

function AccountTab({ name, lastName, email }: AccountTabProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="grid grid-cols-2 gap-6 ">
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2">
            Nome
          </p>
          <p className="text-base font-medium text-slate-900">{name}</p>
        </div>
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2">
            Sobrenome
          </p>
          <p className="text-base font-medium text-slate-900">{lastName}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2">
          Email
        </p>
        <p className="text-base font-medium text-slate-900">{email}</p>
      </div>

      <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2">
              Senha
            </p>
            <p className="text-base font-medium text-slate-900">********</p>
          </div>
          <Button variant="outline" className="px-4 py-6">
            <SquarePen />
            Redefinir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountTab;
