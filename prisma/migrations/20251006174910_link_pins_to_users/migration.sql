/*
  Warnings:

  - Added the required column `usuarioId` to the `PinAcessibilidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PinAcessibilidade" ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."PinAcessibilidade" ADD CONSTRAINT "PinAcessibilidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
