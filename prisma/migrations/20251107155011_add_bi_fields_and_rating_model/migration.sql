-- AlterTable
ALTER TABLE "PinAcessibilidade" ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "nome_local" TEXT NOT NULL DEFAULT 'Local não nomeado',
ADD COLUMN     "nota_media" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "pinId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_pinId_userId_key" ON "Rating"("pinId", "userId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "PinAcessibilidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
