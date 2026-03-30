package com.helpdesk.HelpDeskApplication.repsitory;

import com.helpdesk.HelpDeskApplication.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository <Ticket, Long> {

    Optional<Ticket> findByTicketId(Long ticketId);
    Optional<Ticket> findByUsername(String username);
}
