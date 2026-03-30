package com.helpdesk.HelpDeskApplication.service;

import com.helpdesk.HelpDeskApplication.entity.Ticket;
import com.helpdesk.HelpDeskApplication.repsitory.TicketRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;

@Service
//@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    @PostConstruct
    void init() {
        System.out.println("TicketService initialized");
    }

    @PreDestroy
    void destroy() {
        System.out.println("TicketService destroyed");
    }

    //create ticket
    public Ticket getTicket() {
        Ticket ticket = new Ticket();
        ticket.setTitle("Sample Ticket");
        ticket.setDescription("This is a sample ticket description.");
        ticket.setStatus(com.helpdesk.HelpDeskApplication.entity.Status.OPEN);
        ticket.setPriority(com.helpdesk.HelpDeskApplication.Priority.HIGH);
        ticket.setAssignedTo("John Doe");
        ticket.setUsername("johndoe");
        return ticketRepository.save(ticket);
    }
}

