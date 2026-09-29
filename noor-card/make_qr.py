"""Generate a print-ready QR code for the Noor business card.

Usage:  python3 make_qr.py https://your-domain/max
Output: qr-card.svg (vector, for print) and qr-card.png (1200px, for slides / screens)
"""
import sys
import qrcode
import qrcode.image.svg

url = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)
kw = dict(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)

qr = qrcode.QRCode(box_size=10, image_factory=qrcode.image.svg.SvgPathImage, **kw)
qr.add_data(url); qr.make(fit=True)
qr.make_image().save("qr-card.svg")

qr = qrcode.QRCode(box_size=40, **kw)
qr.add_data(url); qr.make(fit=True)
qr.make_image(fill_color="black", back_color="white").resize((1200, 1200)).save("qr-card.png")
print("qr-card.svg, qr-card.png ->", url)
