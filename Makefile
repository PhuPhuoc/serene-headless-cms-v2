BACKUP_FILE = backup.tar.gz

# Tạo bản sao lưu vào file backup.tar.gz
export:
	npx strapi export -f $(BACKUP_FILE) --no-encrypt

# Khôi phục dữ liệu từ file backup.tar.gz
import:
	npx strapi import -f $(BACKUP_FILE) --force --no-encrypt
