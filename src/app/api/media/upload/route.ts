import { writeFile } from "@/lib/fileManager";
import { getToDayString } from "@/utils/getToDayString";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    let filepath = "";
    if (file instanceof File) {
      filepath = await writeFile({
        file,
        dir: getToDayString(),
        name: crypto.randomUUID() + file.name,
        type: "image",
      });
    }
    return Response.json({ message: "Hello World", filepath });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Content type not allowed" },
      { status: 400 },
    );
  }
}
