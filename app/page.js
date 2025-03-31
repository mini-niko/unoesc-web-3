"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import {
  AlertDialogHeader,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";

export default () => {
  const [data, setData] = useState([]);

  const [table, setTable] = useState(<></>);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [adress, setAdress] = useState("");

  async function getUsers() {
    const response = await fetch("/api/client");

    const users = await response.json();

    setData(users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function onCreateSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/client", {
      method: "POST",
      body: JSON.stringify({
        name,
        age,
        adress,
      }),
    });

    getUsers();
  }

  async function onDeleteSubmit() {
    const response = await fetch("/api/client", {
      method: "DELETE",
      body: id,
    });

    getUsers();
  }

  async function onUpdateSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/client", {
      method: "PUT",
      body: JSON.stringify({
        id,
        name,
        age,
        adress,
      }),
    });

    getUsers();
  }

  return (
    <div className="flex flex-col items-center p-8 min-h-screen gap-8">
      <h1 className="text-3xl font-semibold">Cadastro de clientes</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setId("");
              setName("");
              setAge("");
              setAdress("");
            }}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar um novo cliente
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={onCreateSubmit}>
            <div className="grid grid-cols-4 items-center text-right gap-4">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                className="col-span-3"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center text-right gap-4">
              <Label htmlFor="age">Idade</Label>
              <Input
                type="number"
                className="col-span-3"
                id="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center text-right gap-4">
              <Label htmlFor="adress">Endereço</Label>
              <Input
                type="text"
                className="col-span-3"
                id="adress"
                value={adress}
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="w-screen px-64">
        <Table>
          <TableCaption>Lista de clientes atuais</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
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
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.adress}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <AlertDialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="mr-2"
                                onClick={() => {
                                  setId(client.id);
                                }}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Deletar</p>
                          </TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Uma vez o cliente deletado, será impossível
                              desfazer a ação.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction asChild>
                              <Button variant="ghost" onClick={onDeleteSubmit}>
                                Confirmar
                              </Button>
                            </AlertDialogAction>
                            <AlertDialogCancel asChild>
                              <Button>Cancelar</Button>
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Dialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setId(client.id);
                                  setName(client.name);
                                  setAge(client.age);
                                  setAdress(client.adress);
                                }}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Atualizar</p>
                          </TooltipContent>
                        </Tooltip>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Atualizar cliente</DialogTitle>
                            <DialogDescription>
                              Preencha os dados para atualizar o cliente.
                            </DialogDescription>
                          </DialogHeader>

                          <form className="space-y-6" onSubmit={onUpdateSubmit}>
                            <div className="grid grid-cols-4 items-center text-right gap-4">
                              <Label htmlFor="name" className="text-right">
                                Id
                              </Label>
                              <Input
                                disabled
                                type="number"
                                className="col-span-3"
                                id="name"
                                value={id}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center text-right gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nome
                              </Label>
                              <Input
                                type="text"
                                className="col-span-3"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center text-right gap-4">
                              <Label htmlFor="age">Idade</Label>
                              <Input
                                type="number"
                                className="col-span-3"
                                id="age"
                                value={age}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center text-right gap-4">
                              <Label htmlFor="adress">Endereço</Label>
                              <Input
                                type="text"
                                className="col-span-3"
                                id="age"
                                value={adress}
                                onChange={(e) => {
                                  setAdress(e.target.value);
                                }}
                              />
                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="ghost">
                                  Cancelar
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="submit">Salvar</Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
