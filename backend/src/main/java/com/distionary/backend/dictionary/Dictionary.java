package com.distionary.backend.dictionary;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "dictionary")
public class Dictionary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "api_key", nullable = false, unique = true, length = 64)
    private String apiKey;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column(length = 64)
    private String icon;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_source", nullable = false, length = 32)
    private DictionarySource dataSource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private DictionaryStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "last_modified_at", nullable = false)
    private Instant lastModifiedAt;

    @Column(name = "last_modified_by")
    private String lastModifiedBy;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        if (createdAt == null) createdAt = now;
        if (lastModifiedAt == null) lastModifiedAt = now;
        if (status == null) status = DictionaryStatus.DRAFT;
        if (dataSource == null) dataSource = DictionarySource.INTERNAL;
    }

    @PreUpdate
    void onUpdate() {
        lastModifiedAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public DictionarySource getDataSource() { return dataSource; }
    public void setDataSource(DictionarySource dataSource) { this.dataSource = dataSource; }
    public DictionaryStatus getStatus() { return status; }
    public void setStatus(DictionaryStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getLastModifiedAt() { return lastModifiedAt; }
    public String getLastModifiedBy() { return lastModifiedBy; }
    public void setLastModifiedBy(String lastModifiedBy) { this.lastModifiedBy = lastModifiedBy; }
}
