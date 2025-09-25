-- CreateTable
CREATE TABLE "public"."PinAcessibilidade" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipoAcessibilidade" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PinAcessibilidade_pkey" PRIMARY KEY ("id")
);
