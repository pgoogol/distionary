package com.distionary.backend.dictionary;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public final class DictionaryDtos {

    private DictionaryDtos() {}

    public record CreateRequest(
            @NotBlank
            @Size(max = 64)
            @Pattern(regexp = "^[a-z][a-z0-9_-]{1,63}$",
                    message = "apiKey must start with a lowercase letter and contain only [a-z0-9_-]")
            String apiKey,

            @NotBlank
            @Size(max = 255)
            String name,

            @Size(max = 4000)
            String description,

            @Size(max = 64)
            String icon,

            DictionarySource dataSource,

            DictionaryStatus status
    ) {}

    public record Response(
            Long id,
            String apiKey,
            String name,
            String description,
            String icon,
            DictionarySource dataSource,
            DictionaryStatus status,
            Instant createdAt,
            Instant lastModifiedAt,
            String lastModifiedBy
    ) {
        public static Response from(Dictionary d) {
            return new Response(
                    d.getId(),
                    d.getApiKey(),
                    d.getName(),
                    d.getDescription(),
                    d.getIcon(),
                    d.getDataSource(),
                    d.getStatus(),
                    d.getCreatedAt(),
                    d.getLastModifiedAt(),
                    d.getLastModifiedBy()
            );
        }
    }
}
