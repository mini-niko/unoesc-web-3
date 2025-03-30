import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";

export default () => {
  const data = [
    {
      name: "João da Silva",
      age: 23,
      adress: "Avenida Brasil, 10",
    },
    {
      name: "Roberta de Souza",
      age: 32,
      adress: "Rua General Osório, 107, Apto 304",
    },
    {
      name: "Luiz da Silva de Oliveira",
      age: 27,
      adress: "Rua Celestino do Nascimento, 132",
    },
  ];

  return (
    <div className="flex flex-col items-center p-8 min-h-screen gap-8">
      <h1 className="text-3xl">Cadastro de clientes</h1>
      <div className="w-screen px-96">
        <Table>
          <TableCaption>Lista de clientes atuais</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-min">Idade</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.adress}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
