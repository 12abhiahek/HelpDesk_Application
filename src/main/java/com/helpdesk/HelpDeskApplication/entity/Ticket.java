package com.helpdesk.HelpDeskApplication.entity;

import com.helpdesk.HelpDeskApplication.Priority;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    private String assignedTo;
    private String username;
    private LocalDate createdDate;
    private LocalDateTime updatedDateTime;
    private LocalTime endTime;

    @PrePersist
    void presaveTicket() {
        if (this.createdDate == null) {
            this.createdDate = LocalDate.now();
        }
        this.updatedDateTime = LocalDateTime.now();
    }
    @PreUpdate
    void updateTicket() {
        this.updatedDateTime = LocalDateTime.now();
    }



}
