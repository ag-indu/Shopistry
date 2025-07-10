package com.shopistry.backend.config;

import com.shopistry.backend.model.Product;
import com.shopistry.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.util.Map;

@Component
public class ProductImageUpdater implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        // Map of product ID to image filename
        Map<Integer, String> productImages = Map.of(
                1, "mouse.jpg",
                2, "yogamat.jpg",
                3, "speaker.jpg",
                4, "shoes.jpg",
                5, "notebook.jpg",
                6, "monitor.jpg",
                7, "keyboard.jpg",
                8, "bottle.jpg",
                9, "lamp.jpg",
                10, "smartphone.jpg"
        );

        for (var entry : productImages.entrySet()) {
            int productId = entry.getKey();
            String imageFileName = entry.getValue();

            Product product = productRepository.findById(productId).orElse(null);
            if (product == null) {
                System.out.println("Product with ID " + productId + " not found.");
                continue;
            }

            // Load the image file
            ClassPathResource imageFile = new ClassPathResource("static/images/" + imageFileName);
            if (!imageFile.exists()) {
                System.out.println("Image file " + imageFileName + " not found.");
                continue;
            }

            // Read bytes
            byte[] imageBytes = StreamUtils.copyToByteArray(imageFile.getInputStream());

            // Update image fields
            product.setImageData(imageBytes);
            product.setImageName(imageFileName);
            product.setImageType("image/jpeg"); // or detect dynamically if needed

            productRepository.save(product);
        }

        System.out.println("✅ Existing products updated with image data.");
    }
}
