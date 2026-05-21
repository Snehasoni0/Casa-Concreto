import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace data-aos on other elements
replacements = [
    ('<div class="gallery-headings" data-aos="fade-up">', '<div class="gallery-headings reveal-up">'),
    ('<div class="owl-carousel gallery-carousel" data-aos="fade-up">', '<div class="owl-carousel gallery-carousel reveal-up">'),
    ('<div class="gallery-footer" data-aos="fade-up">', '<div class="gallery-footer reveal-up">'),
    ('<div data-aos="fade-right" data-aos-duration="1000" class="cuisine-text">', '<div class="cuisine-text reveal-right">'),
    ('<div data-aos="fade-left" data-aos-duration="1000" class="cuisine-gallery">', '<div class="cuisine-gallery reveal-left">'),
    ('<section data-aos="fade-up" data-aos-duration="1000" class="reels-section">', '<section class="reels-section reveal-up">'),
    ('<section data-aos="fade-up" data-aos-duration="1000" class="testimonial-section">', '<section class="testimonial-section reveal-up">'),
    ('<div data-aos="fade-in" data-aos-duration="2000" class="testimonial-rotator">', '<div class="testimonial-rotator reveal-in">'),
    ('<section data-aos="fade-up" data-aos-duration="1000" class="home-blogs">', '<section class="home-blogs reveal-up">'),
    ('<section class="featured-section light-theme" data-aos="fade-up" data-aos-duration="1000">', '<section class="featured-section light-theme reveal-up">')
]

for old, new in replacements:
    content = content.replace(old, new)

# Add reveal-in script
in_reveal_script = '''
    // IN REVEAL
    gsap.utils.toArray(".reveal-in").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",

        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });
    });
'''

if '// IN REVEAL' not in content:
    content = content.replace('// LIGHTWEIGHT STAGGER', in_reveal_script + '\n    // LIGHTWEIGHT STAGGER')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
