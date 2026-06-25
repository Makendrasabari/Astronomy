import os
from PIL import Image

def main():
    images_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Scanning images in: {images_dir}")
    
    files = [f for f in os.listdir(images_dir) if f.endswith('.webp') and '_thumb' not in f and 'logo' not in f]
    
    for f in files:
        src_path = os.path.join(images_dir, f)
        dest_name = f.replace('.webp', '_thumb.webp')
        dest_path = os.path.join(images_dir, dest_name)
        
        try:
            with Image.open(src_path) as img:
                # Resize to common card size, e.g., max width 600
                img.thumbnail((600, 400))
                # Save with quality 70 to make it small (<100KB)
                img.save(dest_path, 'WEBP', quality=70)
                
            size = os.path.getsize(dest_path)
            print(f"Compressed {f} -> {dest_name} ({size / 1024:.2f} KB)")
        except Exception as e:
            print(f"Error compressing {f}: {e}")

if __name__ == '__main__':
    main()
