<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Janusz
 *
 * @ORM\Table(name="janusz", indexes={@ORM\Index(name="fk_janusz_1_idx", columns={"pearson_id"})})
 * @ORM\Entity
 */
class Janusz
{
    /**
     * @var string
     *
     * @ORM\Column(name="reason", type="string", length=45, nullable=true)
     */
    private $reason;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="date", nullable=true)
     */
    private $date;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Pearson
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Pearson")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pearson_id", referencedColumnName="id")
     * })
     */
    private $pearson;



    /**
     * Set reason
     *
     * @param string $reason
     *
     * @return Janusz
     */
    public function setReason($reason)
    {
        $this->reason = $reason;

        return $this;
    }

    /**
     * Get reason
     *
     * @return string
     */
    public function getReason()
    {
        return $this->reason;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Janusz
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set pearson
     *
     * @param \AppBundle\Entity\Pearson $pearson
     *
     * @return Janusz
     */
    public function setPearson(\AppBundle\Entity\Pearson $pearson = null)
    {
        $this->pearson = $pearson;

        return $this;
    }

    /**
     * Get pearson
     *
     * @return \AppBundle\Entity\Pearson
     */
    public function getPearson()
    {
        return $this->pearson;
    }
}
