-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "CPF" VARCHAR(11) NOT NULL,
    "numero_telefone" VARCHAR(12),
    "senha" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "data_inscricao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleAuthorization" (
    "id_role" SERIAL NOT NULL,
    "nome_role" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RoleAuthorization_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "Planos" (
    "id" SERIAL NOT NULL,
    "nome_plano" VARCHAR(120) NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "Planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscricoes" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "planoId" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscricoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_CPF_key" ON "Usuarios"("CPF");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RoleAuthorization"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricoes" ADD CONSTRAINT "Inscricoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricoes" ADD CONSTRAINT "Inscricoes_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
