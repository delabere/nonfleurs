from PIL import Image

def convert_and_rotate(input_path, output_path):
    # Open an existing image
    img = Image.open(input_path)
    
    # Convert transparency to white if necessary
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        # Use a white background image
        alpha = img.convert('RGBA').split()[-1]
        bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
        bg.paste(img, mask=alpha)
        img = bg.convert('RGB')
    else:
        print("Image has no transparency")
        img = img.convert('RGB')
    
    # Rotate the image by 90 degrees
    rotated_img = img.rotate(90, expand=True)

    # Save the resulting image
    rotated_img.save(output_path, "PNG")

# Example usage
convert_and_rotate('test.png', 'test_rotate.png')
