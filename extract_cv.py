from docx import Document

doc = Document('/home/ubuntu/upload/AJ_AlJarallah_CV_Master.docx')
print('=== FULL CV CONTENT ===')
for i, para in enumerate(doc.paragraphs):
    if para.text.strip():
        style = para.style.name if para.style else 'None'
        print(f"[{i}] STYLE={style!r} | {para.text}")
