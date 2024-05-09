-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "repeating" BOOLEAN NOT NULL,
    "frequency" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletionDetails" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "CompletionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompletionDetailsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompletionDetailsToUser_AB_unique" ON "_CompletionDetailsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CompletionDetailsToUser_B_index" ON "_CompletionDetailsToUser"("B");

-- AddForeignKey
ALTER TABLE "CompletionDetails" ADD CONSTRAINT "CompletionDetails_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletionDetailsToUser" ADD CONSTRAINT "_CompletionDetailsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CompletionDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletionDetailsToUser" ADD CONSTRAINT "_CompletionDetailsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
